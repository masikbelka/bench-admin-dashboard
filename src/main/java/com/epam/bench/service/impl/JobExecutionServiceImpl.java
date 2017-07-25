package com.epam.bench.service.impl;

import com.epam.bench.service.JobExecutionService;
import com.epam.bench.domain.JobExecution;
import com.epam.bench.repository.JobExecutionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing JobExecution.
 */
@Service
@Transactional
public class JobExecutionServiceImpl implements JobExecutionService{

    private final Logger log = LoggerFactory.getLogger(JobExecutionServiceImpl.class);

    private final JobExecutionRepository jobExecutionRepository;

    public JobExecutionServiceImpl(JobExecutionRepository jobExecutionRepository) {
        this.jobExecutionRepository = jobExecutionRepository;
    }

    /**
     * Save a jobExecution.
     *
     * @param jobExecution the entity to save
     * @return the persisted entity
     */
    @Override
    public JobExecution save(JobExecution jobExecution) {
        log.debug("Request to save JobExecution : {}", jobExecution);
        return jobExecutionRepository.save(jobExecution);
    }

    /**
     *  Get all the jobExecutions.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<JobExecution> findAll(Pageable pageable) {
        log.debug("Request to get all JobExecutions");
        return jobExecutionRepository.findAll(pageable);
    }

    /**
     *  Get one jobExecution by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public JobExecution findOne(Long id) {
        log.debug("Request to get JobExecution : {}", id);
        return jobExecutionRepository.findOne(id);
    }

    /**
     *  Delete the  jobExecution by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete JobExecution : {}", id);
        jobExecutionRepository.delete(id);
    }
}
