package com.epam.bench.service.impl;

import com.epam.bench.service.ProjectRoleService;
import com.epam.bench.domain.ProjectRole;
import com.epam.bench.repository.ProjectRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ProjectRole.
 */
@Service
@Transactional
public class ProjectRoleServiceImpl implements ProjectRoleService{

    private final Logger log = LoggerFactory.getLogger(ProjectRoleServiceImpl.class);

    private final ProjectRoleRepository projectRoleRepository;

    public ProjectRoleServiceImpl(ProjectRoleRepository projectRoleRepository) {
        this.projectRoleRepository = projectRoleRepository;
    }

    /**
     * Save a projectRole.
     *
     * @param projectRole the entity to save
     * @return the persisted entity
     */
    @Override
    public ProjectRole save(ProjectRole projectRole) {
        log.debug("Request to save ProjectRole : {}", projectRole);
        return projectRoleRepository.save(projectRole);
    }

    /**
     *  Get all the projectRoles.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProjectRole> findAll(Pageable pageable) {
        log.debug("Request to get all ProjectRoles");
        return projectRoleRepository.findAll(pageable);
    }

    /**
     *  Get one projectRole by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProjectRole findOne(Long id) {
        log.debug("Request to get ProjectRole : {}", id);
        return projectRoleRepository.findOne(id);
    }

    /**
     *  Delete the  projectRole by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProjectRole : {}", id);
        projectRoleRepository.delete(id);
    }
}
