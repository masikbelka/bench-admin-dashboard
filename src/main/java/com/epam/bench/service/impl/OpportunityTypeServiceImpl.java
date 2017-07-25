package com.epam.bench.service.impl;

import com.epam.bench.service.OpportunityTypeService;
import com.epam.bench.domain.OpportunityType;
import com.epam.bench.repository.OpportunityTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing OpportunityType.
 */
@Service
@Transactional
public class OpportunityTypeServiceImpl implements OpportunityTypeService{

    private final Logger log = LoggerFactory.getLogger(OpportunityTypeServiceImpl.class);

    private final OpportunityTypeRepository opportunityTypeRepository;

    public OpportunityTypeServiceImpl(OpportunityTypeRepository opportunityTypeRepository) {
        this.opportunityTypeRepository = opportunityTypeRepository;
    }

    /**
     * Save a opportunityType.
     *
     * @param opportunityType the entity to save
     * @return the persisted entity
     */
    @Override
    public OpportunityType save(OpportunityType opportunityType) {
        log.debug("Request to save OpportunityType : {}", opportunityType);
        return opportunityTypeRepository.save(opportunityType);
    }

    /**
     *  Get all the opportunityTypes.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OpportunityType> findAll(Pageable pageable) {
        log.debug("Request to get all OpportunityTypes");
        return opportunityTypeRepository.findAll(pageable);
    }

    /**
     *  Get one opportunityType by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OpportunityType findOne(Long id) {
        log.debug("Request to get OpportunityType : {}", id);
        return opportunityTypeRepository.findOne(id);
    }

    /**
     *  Delete the  opportunityType by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OpportunityType : {}", id);
        opportunityTypeRepository.delete(id);
    }
}
