package com.epam.bench.service.impl;

import com.epam.bench.service.BenchPredictionsService;
import com.epam.bench.domain.BenchPredictions;
import com.epam.bench.repository.BenchPredictionsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BenchPredictions.
 */
@Service
@Transactional
public class BenchPredictionsServiceImpl implements BenchPredictionsService{

    private final Logger log = LoggerFactory.getLogger(BenchPredictionsServiceImpl.class);

    private final BenchPredictionsRepository benchPredictionsRepository;

    public BenchPredictionsServiceImpl(BenchPredictionsRepository benchPredictionsRepository) {
        this.benchPredictionsRepository = benchPredictionsRepository;
    }

    /**
     * Save a benchPredictions.
     *
     * @param benchPredictions the entity to save
     * @return the persisted entity
     */
    @Override
    public BenchPredictions save(BenchPredictions benchPredictions) {
        log.debug("Request to save BenchPredictions : {}", benchPredictions);
        return benchPredictionsRepository.save(benchPredictions);
    }

    /**
     *  Get all the benchPredictions.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BenchPredictions> findAll(Pageable pageable) {
        log.debug("Request to get all BenchPredictions");
        return benchPredictionsRepository.findAll(pageable);
    }

    /**
     *  Get one benchPredictions by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BenchPredictions findOne(Long id) {
        log.debug("Request to get BenchPredictions : {}", id);
        return benchPredictionsRepository.findOne(id);
    }

    /**
     *  Delete the  benchPredictions by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BenchPredictions : {}", id);
        benchPredictionsRepository.delete(id);
    }
}
