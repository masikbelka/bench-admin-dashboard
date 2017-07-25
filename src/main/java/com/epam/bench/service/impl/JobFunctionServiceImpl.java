package com.epam.bench.service.impl;

import com.epam.bench.service.JobFunctionService;
import com.epam.bench.domain.JobFunction;
import com.epam.bench.repository.JobFunctionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing JobFunction.
 */
@Service
@Transactional
public class JobFunctionServiceImpl implements JobFunctionService{

    private final Logger log = LoggerFactory.getLogger(JobFunctionServiceImpl.class);

    private final JobFunctionRepository jobFunctionRepository;

    public JobFunctionServiceImpl(JobFunctionRepository jobFunctionRepository) {
        this.jobFunctionRepository = jobFunctionRepository;
    }

    /**
     * Save a jobFunction.
     *
     * @param jobFunction the entity to save
     * @return the persisted entity
     */
    @Override
    public JobFunction save(JobFunction jobFunction) {
        log.debug("Request to save JobFunction : {}", jobFunction);
        return jobFunctionRepository.save(jobFunction);
    }

    /**
     *  Get all the jobFunctions.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<JobFunction> findAll(Pageable pageable) {
        log.debug("Request to get all JobFunctions");
        return jobFunctionRepository.findAll(pageable);
    }

    /**
     *  Get one jobFunction by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public JobFunction findOne(Long id) {
        log.debug("Request to get JobFunction : {}", id);
        return jobFunctionRepository.findOne(id);
    }

    /**
     *  Delete the  jobFunction by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete JobFunction : {}", id);
        jobFunctionRepository.delete(id);
    }
}
