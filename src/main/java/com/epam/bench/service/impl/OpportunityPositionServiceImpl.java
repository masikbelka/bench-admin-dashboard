package com.epam.bench.service.impl;

import com.epam.bench.service.OpportunityPositionService;
import com.epam.bench.domain.OpportunityPosition;
import com.epam.bench.repository.OpportunityPositionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing OpportunityPosition.
 */
@Service
@Transactional
public class OpportunityPositionServiceImpl implements OpportunityPositionService{

    private final Logger log = LoggerFactory.getLogger(OpportunityPositionServiceImpl.class);

    private final OpportunityPositionRepository opportunityPositionRepository;

    public OpportunityPositionServiceImpl(OpportunityPositionRepository opportunityPositionRepository) {
        this.opportunityPositionRepository = opportunityPositionRepository;
    }

    /**
     * Save a opportunityPosition.
     *
     * @param opportunityPosition the entity to save
     * @return the persisted entity
     */
    @Override
    public OpportunityPosition save(OpportunityPosition opportunityPosition) {
        log.debug("Request to save OpportunityPosition : {}", opportunityPosition);
        return opportunityPositionRepository.save(opportunityPosition);
    }

    /**
     *  Get all the opportunityPositions.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OpportunityPosition> findAll(Pageable pageable) {
        log.debug("Request to get all OpportunityPositions");
        return opportunityPositionRepository.findAll(pageable);
    }

    /**
     *  Get one opportunityPosition by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OpportunityPosition findOne(Long id) {
        log.debug("Request to get OpportunityPosition : {}", id);
        return opportunityPositionRepository.findOne(id);
    }

    /**
     *  Delete the  opportunityPosition by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OpportunityPosition : {}", id);
        opportunityPositionRepository.delete(id);
    }
}
