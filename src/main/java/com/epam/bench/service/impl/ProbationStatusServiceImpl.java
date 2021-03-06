package com.epam.bench.service.impl;

import com.epam.bench.service.ProbationStatusService;
import com.epam.bench.domain.ProbationStatus;
import com.epam.bench.repository.ProbationStatusRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ProbationStatus.
 */
@Service
@Transactional
public class ProbationStatusServiceImpl implements ProbationStatusService{

    private final Logger log = LoggerFactory.getLogger(ProbationStatusServiceImpl.class);

    private final ProbationStatusRepository probationStatusRepository;

    public ProbationStatusServiceImpl(ProbationStatusRepository probationStatusRepository) {
        this.probationStatusRepository = probationStatusRepository;
    }

    /**
     * Save a probationStatus.
     *
     * @param probationStatus the entity to save
     * @return the persisted entity
     */
    @Override
    public ProbationStatus save(ProbationStatus probationStatus) {
        log.debug("Request to save ProbationStatus : {}", probationStatus);
        return probationStatusRepository.save(probationStatus);
    }

    /**
     *  Get all the probationStatuses.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProbationStatus> findAll(Pageable pageable) {
        log.debug("Request to get all ProbationStatuses");
        return probationStatusRepository.findAll(pageable);
    }

    /**
     *  Get one probationStatus by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProbationStatus findOne(Long id) {
        log.debug("Request to get ProbationStatus : {}", id);
        return probationStatusRepository.findOne(id);
    }

    /**
     *  Delete the  probationStatus by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProbationStatus : {}", id);
        probationStatusRepository.delete(id);
    }
}
