package com.epam.bench.service.impl;

import com.epam.bench.service.BillingTypeService;
import com.epam.bench.domain.BillingType;
import com.epam.bench.repository.BillingTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BillingType.
 */
@Service
@Transactional
public class BillingTypeServiceImpl implements BillingTypeService{

    private final Logger log = LoggerFactory.getLogger(BillingTypeServiceImpl.class);

    private final BillingTypeRepository billingTypeRepository;

    public BillingTypeServiceImpl(BillingTypeRepository billingTypeRepository) {
        this.billingTypeRepository = billingTypeRepository;
    }

    /**
     * Save a billingType.
     *
     * @param billingType the entity to save
     * @return the persisted entity
     */
    @Override
    public BillingType save(BillingType billingType) {
        log.debug("Request to save BillingType : {}", billingType);
        return billingTypeRepository.save(billingType);
    }

    /**
     *  Get all the billingTypes.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BillingType> findAll(Pageable pageable) {
        log.debug("Request to get all BillingTypes");
        return billingTypeRepository.findAll(pageable);
    }

    /**
     *  Get one billingType by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BillingType findOne(Long id) {
        log.debug("Request to get BillingType : {}", id);
        return billingTypeRepository.findOne(id);
    }

    /**
     *  Delete the  billingType by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BillingType : {}", id);
        billingTypeRepository.delete(id);
    }
}
