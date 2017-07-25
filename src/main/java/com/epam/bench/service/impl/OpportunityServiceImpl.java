package com.epam.bench.service.impl;

import com.epam.bench.service.OpportunityService;
import com.epam.bench.domain.Opportunity;
import com.epam.bench.repository.OpportunityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Opportunity.
 */
@Service
@Transactional
public class OpportunityServiceImpl implements OpportunityService{

    private final Logger log = LoggerFactory.getLogger(OpportunityServiceImpl.class);

    private final OpportunityRepository opportunityRepository;

    public OpportunityServiceImpl(OpportunityRepository opportunityRepository) {
        this.opportunityRepository = opportunityRepository;
    }

    /**
     * Save a opportunity.
     *
     * @param opportunity the entity to save
     * @return the persisted entity
     */
    @Override
    public Opportunity save(Opportunity opportunity) {
        log.debug("Request to save Opportunity : {}", opportunity);
        return opportunityRepository.save(opportunity);
    }

    /**
     *  Get all the opportunities.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Opportunity> findAll(Pageable pageable) {
        log.debug("Request to get all Opportunities");
        return opportunityRepository.findAll(pageable);
    }

    /**
     *  Get one opportunity by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Opportunity findOne(Long id) {
        log.debug("Request to get Opportunity : {}", id);
        return opportunityRepository.findOne(id);
    }

    /**
     *  Delete the  opportunity by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Opportunity : {}", id);
        opportunityRepository.delete(id);
    }
}
