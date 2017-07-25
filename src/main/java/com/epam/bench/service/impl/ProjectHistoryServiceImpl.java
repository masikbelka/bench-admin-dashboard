package com.epam.bench.service.impl;

import com.epam.bench.service.ProjectHistoryService;
import com.epam.bench.domain.ProjectHistory;
import com.epam.bench.repository.ProjectHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ProjectHistory.
 */
@Service
@Transactional
public class ProjectHistoryServiceImpl implements ProjectHistoryService{

    private final Logger log = LoggerFactory.getLogger(ProjectHistoryServiceImpl.class);

    private final ProjectHistoryRepository projectHistoryRepository;

    public ProjectHistoryServiceImpl(ProjectHistoryRepository projectHistoryRepository) {
        this.projectHistoryRepository = projectHistoryRepository;
    }

    /**
     * Save a projectHistory.
     *
     * @param projectHistory the entity to save
     * @return the persisted entity
     */
    @Override
    public ProjectHistory save(ProjectHistory projectHistory) {
        log.debug("Request to save ProjectHistory : {}", projectHistory);
        return projectHistoryRepository.save(projectHistory);
    }

    /**
     *  Get all the projectHistories.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProjectHistory> findAll(Pageable pageable) {
        log.debug("Request to get all ProjectHistories");
        return projectHistoryRepository.findAll(pageable);
    }

    /**
     *  Get one projectHistory by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProjectHistory findOne(Long id) {
        log.debug("Request to get ProjectHistory : {}", id);
        return projectHistoryRepository.findOne(id);
    }

    /**
     *  Delete the  projectHistory by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProjectHistory : {}", id);
        projectHistoryRepository.delete(id);
    }
}
