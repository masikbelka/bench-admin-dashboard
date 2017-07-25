package com.epam.bench.service.impl;

import com.epam.bench.service.SkillCategoryService;
import com.epam.bench.domain.SkillCategory;
import com.epam.bench.repository.SkillCategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing SkillCategory.
 */
@Service
@Transactional
public class SkillCategoryServiceImpl implements SkillCategoryService{

    private final Logger log = LoggerFactory.getLogger(SkillCategoryServiceImpl.class);

    private final SkillCategoryRepository skillCategoryRepository;

    public SkillCategoryServiceImpl(SkillCategoryRepository skillCategoryRepository) {
        this.skillCategoryRepository = skillCategoryRepository;
    }

    /**
     * Save a skillCategory.
     *
     * @param skillCategory the entity to save
     * @return the persisted entity
     */
    @Override
    public SkillCategory save(SkillCategory skillCategory) {
        log.debug("Request to save SkillCategory : {}", skillCategory);
        return skillCategoryRepository.save(skillCategory);
    }

    /**
     *  Get all the skillCategories.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SkillCategory> findAll(Pageable pageable) {
        log.debug("Request to get all SkillCategories");
        return skillCategoryRepository.findAll(pageable);
    }

    /**
     *  Get one skillCategory by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SkillCategory findOne(Long id) {
        log.debug("Request to get SkillCategory : {}", id);
        return skillCategoryRepository.findOne(id);
    }

    /**
     *  Delete the  skillCategory by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SkillCategory : {}", id);
        skillCategoryRepository.delete(id);
    }
}
