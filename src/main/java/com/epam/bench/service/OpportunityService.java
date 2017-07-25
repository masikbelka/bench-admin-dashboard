package com.epam.bench.service;

import com.epam.bench.domain.Opportunity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Opportunity.
 */
public interface OpportunityService {

    /**
     * Save a opportunity.
     *
     * @param opportunity the entity to save
     * @return the persisted entity
     */
    Opportunity save(Opportunity opportunity);

    /**
     *  Get all the opportunities.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Opportunity> findAll(Pageable pageable);

    /**
     *  Get the "id" opportunity.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Opportunity findOne(Long id);

    /**
     *  Delete the "id" opportunity.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
