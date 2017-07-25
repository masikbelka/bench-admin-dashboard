package com.epam.bench.service.impl;

import com.epam.bench.service.TitleService;
import com.epam.bench.domain.Title;
import com.epam.bench.repository.TitleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Title.
 */
@Service
@Transactional
public class TitleServiceImpl implements TitleService{

    private final Logger log = LoggerFactory.getLogger(TitleServiceImpl.class);

    private final TitleRepository titleRepository;

    public TitleServiceImpl(TitleRepository titleRepository) {
        this.titleRepository = titleRepository;
    }

    /**
     * Save a title.
     *
     * @param title the entity to save
     * @return the persisted entity
     */
    @Override
    public Title save(Title title) {
        log.debug("Request to save Title : {}", title);
        return titleRepository.save(title);
    }

    /**
     *  Get all the titles.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Title> findAll(Pageable pageable) {
        log.debug("Request to get all Titles");
        return titleRepository.findAll(pageable);
    }

    /**
     *  Get one title by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Title findOne(Long id) {
        log.debug("Request to get Title : {}", id);
        return titleRepository.findOne(id);
    }

    /**
     *  Delete the  title by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Title : {}", id);
        titleRepository.delete(id);
    }
}
