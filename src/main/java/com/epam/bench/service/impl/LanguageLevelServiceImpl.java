package com.epam.bench.service.impl;

import com.epam.bench.service.LanguageLevelService;
import com.epam.bench.domain.LanguageLevel;
import com.epam.bench.repository.LanguageLevelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing LanguageLevel.
 */
@Service
@Transactional
public class LanguageLevelServiceImpl implements LanguageLevelService{

    private final Logger log = LoggerFactory.getLogger(LanguageLevelServiceImpl.class);

    private final LanguageLevelRepository languageLevelRepository;

    public LanguageLevelServiceImpl(LanguageLevelRepository languageLevelRepository) {
        this.languageLevelRepository = languageLevelRepository;
    }

    /**
     * Save a languageLevel.
     *
     * @param languageLevel the entity to save
     * @return the persisted entity
     */
    @Override
    public LanguageLevel save(LanguageLevel languageLevel) {
        log.debug("Request to save LanguageLevel : {}", languageLevel);
        return languageLevelRepository.save(languageLevel);
    }

    /**
     *  Get all the languageLevels.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<LanguageLevel> findAll(Pageable pageable) {
        log.debug("Request to get all LanguageLevels");
        return languageLevelRepository.findAll(pageable);
    }

    /**
     *  Get one languageLevel by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public LanguageLevel findOne(Long id) {
        log.debug("Request to get LanguageLevel : {}", id);
        return languageLevelRepository.findOne(id);
    }

    /**
     *  Delete the  languageLevel by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LanguageLevel : {}", id);
        languageLevelRepository.delete(id);
    }
}
