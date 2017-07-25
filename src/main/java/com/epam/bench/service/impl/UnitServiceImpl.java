package com.epam.bench.service.impl;

import com.epam.bench.service.UnitService;
import com.epam.bench.domain.Unit;
import com.epam.bench.repository.UnitRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Unit.
 */
@Service
@Transactional
public class UnitServiceImpl implements UnitService{

    private final Logger log = LoggerFactory.getLogger(UnitServiceImpl.class);

    private final UnitRepository unitRepository;

    public UnitServiceImpl(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    /**
     * Save a unit.
     *
     * @param unit the entity to save
     * @return the persisted entity
     */
    @Override
    public Unit save(Unit unit) {
        log.debug("Request to save Unit : {}", unit);
        return unitRepository.save(unit);
    }

    /**
     *  Get all the units.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Unit> findAll(Pageable pageable) {
        log.debug("Request to get all Units");
        return unitRepository.findAll(pageable);
    }

    /**
     *  Get one unit by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Unit findOne(Long id) {
        log.debug("Request to get Unit : {}", id);
        return unitRepository.findOne(id);
    }

    /**
     *  Delete the  unit by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Unit : {}", id);
        unitRepository.delete(id);
    }
}
