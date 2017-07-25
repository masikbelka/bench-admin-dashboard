package com.epam.bench.service.impl;

import com.epam.bench.service.PredictionDetailsService;
import com.epam.bench.domain.PredictionDetails;
import com.epam.bench.repository.PredictionDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PredictionDetails.
 */
@Service
@Transactional
public class PredictionDetailsServiceImpl implements PredictionDetailsService{

    private final Logger log = LoggerFactory.getLogger(PredictionDetailsServiceImpl.class);

    private final PredictionDetailsRepository predictionDetailsRepository;

    public PredictionDetailsServiceImpl(PredictionDetailsRepository predictionDetailsRepository) {
        this.predictionDetailsRepository = predictionDetailsRepository;
    }

    /**
     * Save a predictionDetails.
     *
     * @param predictionDetails the entity to save
     * @return the persisted entity
     */
    @Override
    public PredictionDetails save(PredictionDetails predictionDetails) {
        log.debug("Request to save PredictionDetails : {}", predictionDetails);
        return predictionDetailsRepository.save(predictionDetails);
    }

    /**
     *  Get all the predictionDetails.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PredictionDetails> findAll(Pageable pageable) {
        log.debug("Request to get all PredictionDetails");
        return predictionDetailsRepository.findAll(pageable);
    }

    /**
     *  Get one predictionDetails by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PredictionDetails findOne(Long id) {
        log.debug("Request to get PredictionDetails : {}", id);
        return predictionDetailsRepository.findOne(id);
    }

    /**
     *  Delete the  predictionDetails by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PredictionDetails : {}", id);
        predictionDetailsRepository.delete(id);
    }
}
