package com.epam.bench.service.impl;

import com.epam.bench.service.BenchHistoryService;
import com.epam.bench.domain.BenchHistory;
import com.epam.bench.repository.BenchHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BenchHistory.
 */
@Service
@Transactional
public class BenchHistoryServiceImpl implements BenchHistoryService{

    private final Logger log = LoggerFactory.getLogger(BenchHistoryServiceImpl.class);

    private final BenchHistoryRepository benchHistoryRepository;

    public BenchHistoryServiceImpl(BenchHistoryRepository benchHistoryRepository) {
        this.benchHistoryRepository = benchHistoryRepository;
    }

    /**
     * Save a benchHistory.
     *
     * @param benchHistory the entity to save
     * @return the persisted entity
     */
    @Override
    public BenchHistory save(BenchHistory benchHistory) {
        log.debug("Request to save BenchHistory : {}", benchHistory);
        return benchHistoryRepository.save(benchHistory);
    }

    /**
     *  Get all the benchHistories.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BenchHistory> findAll(Pageable pageable) {
        log.debug("Request to get all BenchHistories");
        return benchHistoryRepository.findAll(pageable);
    }

    /**
     *  Get one benchHistory by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BenchHistory findOne(Long id) {
        log.debug("Request to get BenchHistory : {}", id);
        return benchHistoryRepository.findOne(id);
    }

    /**
     *  Delete the  benchHistory by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BenchHistory : {}", id);
        benchHistoryRepository.delete(id);
    }
}
