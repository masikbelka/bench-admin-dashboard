package com.epam.bench.service.impl;

import com.epam.bench.service.BenchCommentHistoryService;
import com.epam.bench.domain.BenchCommentHistory;
import com.epam.bench.repository.BenchCommentHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BenchCommentHistory.
 */
@Service
@Transactional
public class BenchCommentHistoryServiceImpl implements BenchCommentHistoryService{

    private final Logger log = LoggerFactory.getLogger(BenchCommentHistoryServiceImpl.class);

    private final BenchCommentHistoryRepository benchCommentHistoryRepository;

    public BenchCommentHistoryServiceImpl(BenchCommentHistoryRepository benchCommentHistoryRepository) {
        this.benchCommentHistoryRepository = benchCommentHistoryRepository;
    }

    /**
     * Save a benchCommentHistory.
     *
     * @param benchCommentHistory the entity to save
     * @return the persisted entity
     */
    @Override
    public BenchCommentHistory save(BenchCommentHistory benchCommentHistory) {
        log.debug("Request to save BenchCommentHistory : {}", benchCommentHistory);
        return benchCommentHistoryRepository.save(benchCommentHistory);
    }

    /**
     *  Get all the benchCommentHistories.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BenchCommentHistory> findAll(Pageable pageable) {
        log.debug("Request to get all BenchCommentHistories");
        return benchCommentHistoryRepository.findAll(pageable);
    }

    /**
     *  Get one benchCommentHistory by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BenchCommentHistory findOne(Long id) {
        log.debug("Request to get BenchCommentHistory : {}", id);
        return benchCommentHistoryRepository.findOne(id);
    }

    /**
     *  Delete the  benchCommentHistory by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BenchCommentHistory : {}", id);
        benchCommentHistoryRepository.delete(id);
    }
}
