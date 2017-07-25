package com.epam.bench.service;

import com.epam.bench.domain.PredictionDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing PredictionDetails.
 */
public interface PredictionDetailsService {

    /**
     * Save a predictionDetails.
     *
     * @param predictionDetails the entity to save
     * @return the persisted entity
     */
    PredictionDetails save(PredictionDetails predictionDetails);

    /**
     *  Get all the predictionDetails.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PredictionDetails> findAll(Pageable pageable);

    /**
     *  Get the "id" predictionDetails.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PredictionDetails findOne(Long id);

    /**
     *  Delete the "id" predictionDetails.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
