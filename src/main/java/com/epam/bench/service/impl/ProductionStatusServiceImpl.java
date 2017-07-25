package com.epam.bench.service.impl;

import com.epam.bench.service.ProductionStatusService;
import com.epam.bench.domain.ProductionStatus;
import com.epam.bench.repository.ProductionStatusRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ProductionStatus.
 */
@Service
@Transactional
public class ProductionStatusServiceImpl implements ProductionStatusService{

    private final Logger log = LoggerFactory.getLogger(ProductionStatusServiceImpl.class);

    private final ProductionStatusRepository productionStatusRepository;

    public ProductionStatusServiceImpl(ProductionStatusRepository productionStatusRepository) {
        this.productionStatusRepository = productionStatusRepository;
    }

    /**
     * Save a productionStatus.
     *
     * @param productionStatus the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductionStatus save(ProductionStatus productionStatus) {
        log.debug("Request to save ProductionStatus : {}", productionStatus);
        return productionStatusRepository.save(productionStatus);
    }

    /**
     *  Get all the productionStatuses.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProductionStatus> findAll(Pageable pageable) {
        log.debug("Request to get all ProductionStatuses");
        return productionStatusRepository.findAll(pageable);
    }

    /**
     *  Get one productionStatus by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProductionStatus findOne(Long id) {
        log.debug("Request to get ProductionStatus : {}", id);
        return productionStatusRepository.findOne(id);
    }

    /**
     *  Delete the  productionStatus by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductionStatus : {}", id);
        productionStatusRepository.delete(id);
    }
}
