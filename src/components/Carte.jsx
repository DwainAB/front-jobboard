import React, { useState, useEffect } from 'react';
import { apiService } from "../API/apiService";
import "../styles/Carte.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Carte() {
    const defaultFilters = {
        type_contract: "",
        location: "",
        type_job: ""
    };
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pageParam = queryParams.get("page");
    let currentPage = parseInt(pageParam) || 1;
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState(defaultFilters);
    const [isAddingJob, setIsAddingJob] = useState(false);
    const [formData, setFormData] = useState({
        title_job: '',
        company_name: '',
        description_job: '',
        location: '',
        type_contract: '',
        type_job: ''
    });
    const [buttonText, setButtonText] = useState("Ajouter une offre");
    const [isEditingJob, setIsEditingJob] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);
    const [sortOption, setSortOption] = useState('');
    const jobsPerPage = 10;

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const updatedFilters = {};

        for (const [key, value] of queryParams.entries()) {
            updatedFilters[key] = value;
        }

        setFilters(updatedFilters);
    }, [location.search]);

    const sortJobs = () => {
        const sortedJobs = [...jobs];
        if (sortOption === 'A-Z') {
            sortedJobs.sort((a, b) => a.title_job.localeCompare(b.title_job));
        } else if (sortOption === 'Z-A') {
            sortedJobs.sort((a, b) => b.title_job.localeCompare(a.title_job));
        } else if (sortOption === 'Date') {
            sortedJobs.sort((a, b) => {
                const dateA = new Date(a.publication_date);
                const dateB = new Date(b.publication_date);
                return dateA - dateB;
            });
        }
        setJobs(sortedJobs);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'trie') {
            setSortOption(value);
            sortJobs();
        } else {
            const newFilters = { ...filters };
    
            if (value === defaultFilters[name]) {
                delete newFilters[name];
            } else {
                newFilters[name] = value;
            }
    
            // Ajoutez la redirection vers la page 1 ici
            const queryParams = new URLSearchParams(newFilters);
            queryParams.set("page", "1"); // Forcez la page à 1
            const newURL = `${location.pathname}?${queryParams.toString()}`;
    
            window.history.replaceState({}, '', newURL);
            setFilters(newFilters);
        }
    };
    

    useEffect(() => {
        fetchJobs();
    }, [filters, sortOption, currentPage]);

    async function fetchJobs() {
        console.log("Fetching with filters:", filters);
        try {
            const queryParams = new URLSearchParams(location.search);
            const pageParam = queryParams.get("page");
            const currentPage = parseInt(pageParam) || 1; // Utilisez la page courante de l'URL ou 1 par défaut
    
            const data = await apiService.getFilteredJobs({ ...filters, page: currentPage });
            console.log("Data received:", data);
    
            if (Array.isArray(data)) {
                let sortedJobs = [...data];
                if (sortOption === 'A-Z') {
                    sortedJobs.sort((a, b) => a.title_job.localeCompare(b.title_job));
                } else if (sortOption === 'Z-A') {
                    sortedJobs.sort((a, b) => b.title_job.localeCompare(a.title_job));
                } else if (sortOption === 'Date') {
                    sortedJobs.sort((a, b) => {
                        const dateA = new Date(a.publication_date);
                        const dateB = new Date(b.publication_date);
                        return dateA - dateB;
                    });
                }
                setJobs(sortedJobs);
            } else {
                console.error("Data received is not an array:", data);
                setJobs([]);
            }


        } catch (error) {
            console.error("Erreur lors de la récupération des jobs:", error);
        }
    }
    

    // Fonction pour gérer l'édition d'une offre d'emploi
    function handleEditJob(job) {
        setCurrentJob(job);
        setFormData({
            title_job: job.title_job,
            company_name: job.company_name,
            description_job: job.description_job,
            location: job.location,
            type_contract: job.type_contract,
            type_job: job.type_job,
        });
        setIsEditingJob(true);
    }

    // Fonction pour mettre à jour une offre d'emploi
    async function handleUpdateJob(e) {
        e.preventDefault();
        
        try {
            const response = await apiService.updateJob(currentJob.id, formData);
            
            console.log(response);
            
            if (response.success) {
                setIsEditingJob(false);
                fetchJobs();
            } else {
                window.location.reload()
                console.error('Erreur lors de la mise à jour de l\'emploi:', response.error);
            }
        } catch (error) {
            window.location.reload()
            console.error('Erreur lors de la soumission du formulaire de mise à jour:', error);
        }
    }

    

    function resetFilters() {
        const queryParams = new URLSearchParams(location.search);
        queryParams.delete("page"); // Supprimer le paramètre de la page courante
        const newURL = `${location.pathname}?${queryParams.toString()}`;
        window.history.replaceState({}, '', newURL);
        window.location.reload()
    }
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await apiService.addJob(formData);

            console.log(response);

            if (response.success) {
                setFormData({
                    title_job: '',
                    company_name: '',
                    description_job: '',
                    location: '',
                    type_contract: '',
                    type_job: ''
                });

                setIsAddingJob(false);
                fetchJobs();
                window.location.reload()
            } else {
                window.location.reload()
                console.error('Erreur lors de l\'ajout de l\'emploi:', response.error);
            }
        } catch (error) {
            window.location.reload()
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    }

    const toggleAddJobForm = () => {
        setIsAddingJob(!isAddingJob);
        setButtonText(isAddingJob ? "Ajouter une offre" : "Annuler");
    };

    const handleDeleteJob = async (id) => {
        try {
            const response = await apiService.deleteJob(id);
            if (response.success) {
                fetchJobs();
            } else {
                console.error("Erreur lors de la suppression:", response.error);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du job:", error);
        }
    };

    function reverseDate(date) {
        return date.split('-').reverse().join('-');
    }

    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    const displayedJobs = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

    return (
        <div className="section-job">
            <div className="filters">
                <select className='filter-contract' name="type_contract" value={filters.type_contract} onChange={handleFilterChange}>
                    <option value="">Type de contrat</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Alternance">Alternance</option>
                    <option value="Freelance">Freelance</option>
                    {/* Ajoutez d'autres options si nécessaire */}
                </select>

                <select className='filter-location' name="location" value={filters.location} onChange={handleFilterChange}>
                    <option value="">Localisation</option>
                    <option value="Paris">Paris</option>
                    <option value="Lyon">Lyon</option>
                    <option value="Marseille">Marseille</option>
                    <option value="Toulouse">Toulouse</option>
                    <option value="Montpellier">Montpellier</option>
                    <option value="Rennes">Rennes</option>
                    {/* Ajoutez d'autres options si nécessaire */}
                </select>

                <select className='filter-job' name="type_job" value={filters.type_job} onChange={handleFilterChange}>
                    <option value="">Type de job</option>
                    <option value="Développement">Développement</option>
                    <option value="Systeme & réseaux">Systeme & réseaux</option>
                    <option value="Data">Data</option>
                    <option value="Cyber-sécurité">Cyber-sécurité</option>
                    {/* Ajoutez d'autres options si nécessaire */}
                </select>

                <button onClick={resetFilters}>Réinitialiser les filtres</button>
            </div>

            <div className='trie'>
                <select name="trie" id="trie" className='filter-job' value={sortOption} onChange={handleFilterChange}>
                    <option value="">Trier par</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="Date">Date de publication</option>
                </select>
            </div>

            <div className='btn-add-job' onClick={toggleAddJobForm}>
                <p>{buttonText}</p>
            </div>

            {/* Affichez les liens de pagination */}
            <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
    <Link
        key={index}
        to={`?page=${index + 1}${filters.type_contract ? `&type_contract=${filters.type_contract}` : ''}${filters.location ? `&location=${filters.location}` : ''}${filters.type_job ? `&type_job=${filters.type_job}` : ''}`}
        className={currentPage === index + 1 ? "page-link activee" : "page-link"}
    >
        {index + 1}
    </Link>
))}
            </div>


            {isAddingJob && (
                <form onSubmit={handleSubmit} className="add-job-form">
                    {/* Champs du formulaire pour ajouter un emploi */}
                    <div>
                        <input type="text" name="title_job" placeholder="Titre de l'emploi" value={formData.title_job} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <input type="text" name="company_name" placeholder="Nom de l'entreprise" value={formData.company_name} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <textarea name="description_job" placeholder="Description de l'emploi" value={formData.description_job} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <select className='' name="location" value={formData.location} onChange={handleInputChange} required>
                            <option value="">Localisation</option>
                            <option value="Paris">Paris</option>
                            <option value="Lyon">Lyon</option>
                            <option value="Marseille">Marseille</option>
                            <option value="Toulouse">Toulouse</option>
                            <option value="Montpellier">Montpellier</option>
                            <option value="Rennes">Rennes</option>
                            {/* Ajoutez d'autres options si nécessaire */}
                        </select>
                    </div>
                    <div>
                        <select name="type_contract" value={formData.type_contract} onChange={handleInputChange} required>
                            <option value="">Type de contrat</option>
                            <option value="CDI">CDI</option>
                            <option value="CDD">CDD</option>
                            <option value="Alternance">Alternance</option>
                            <option value="Freelance">Freelance</option>
                            {/* Ajoutez d'autres options si nécessaire */}
                        </select>
                    </div>
                    <div>
                        <select name="type_job" value={formData.type_job} onChange={handleInputChange} required>
                            <option value="">Type de job</option>
                            <option value="Développement">Développement</option>
                            <option value="Systeme & réseaux">Systeme & réseaux</option>
                            <option value="Data">Data</option>
                            <option value="Cyber-sécurité">Cyber-sécurité</option>
                            {/* Ajoutez d'autres options si nécessaire */}
                        </select>
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
            )}

            <div className='section-carte'>
                {displayedJobs.map((data) => (
                    <div className='carte-job' key={data.id}>
                        <Link to={`/Logement/${data.id}`} className="full-carte">
                            <img className="image-carte" src={data.image_url} alt="" />
                            <div className="shadow-carte">
                                <h2 className="titre-carte info-job">{data.title_job}</h2>
                                <h2 className="info-job">{data.company_name}</h2>
                                <p className='info-job'>{data.location}</p>
                                <p className='info-job'>ref: {data.reference}</p>
                                <p className='info-job'>{reverseDate(data.publication_date)}</p>
                                <p className='info-job'>{data.type_contract}</p>
                                <p className='info-job'>{data.description_job.slice(0, 30)}{data.description_job.length > 30 ? '...' : ''}</p>
                            </div>
                        </Link>

                        <button className='btn-delete' onClick={() => handleDeleteJob(data.id)}>Supprimer</button>
                        <button className='btn-edit' onClick={() => handleEditJob(data)}>Modifier</button>
                    </div>
                ))}

                {isEditingJob && (
                    <div className="modal-edit">
                        <div className="overlay" onClick={() => setIsEditingJob(false)}></div>
                        <form onSubmit={handleUpdateJob} className="edit-job-form">
                            {/* Champs du formulaire pour modifier un emploi (similaires à ceux du formulaire d'ajout) */}
                            <div>
                                <input type="text" name="title_job" placeholder="Titre de l'emploi" value={formData.title_job} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <input type="text" name="company_name" placeholder="Nom de l'entreprise" value={formData.company_name} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <textarea name="description_job" placeholder="Description de l'emploi" value={formData.description_job} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <select className='' name="location" value={formData.location} onChange={handleInputChange} required>
                                    <option value="">Localisation</option>
                                    <option value="Paris">Paris</option>
                                    <option value="Lyon">Lyon</option>
                                    <option value="Marseille">Marseille</option>
                                    <option value="Toulouse">Toulouse</option>
                                    <option value="Montpellier">Montpellier</option>
                                    <option value="Rennes">Rennes</option>
                                    {/* Ajoutez d'autres options si nécessaire */}
                                </select>
                            </div>
                            <div>
                                <select name="type_contract" value={formData.type_contract} onChange={handleInputChange} required>
                                    <option value="">Type de contrat</option>
                                    <option value="CDI">CDI</option>
                                    <option value="CDD">CDD</option>
                                    <option value="Alternance">Alternance</option>
                                    <option value="Freelance">Freelance</option>
                                    {/* Ajoutez d'autres options si nécessaire */}
                                </select>
                            </div>
                            <div>
                                <select name="type_job" value={formData.type_job} onChange={handleInputChange} required>
                                    <option value="">Type de job</option>
                                    <option value="Développement">Développement</option>
                                    <option value="Systeme & réseaux">Systeme & réseaux</option>
                                    <option value="Data">Data</option>
                                    <option value="Cyber-sécurité">Cyber-sécurité</option>
                                    {/* Ajoutez d'autres options si nécessaire */}
                                </select>
                            </div>
                            <button type="submit">Mettre à jour</button>
                        </form>
                    </div>
                )}

                {/* Affichez les liens de pagination */}

            </div>
        </div>
    );
}

export default Carte;
