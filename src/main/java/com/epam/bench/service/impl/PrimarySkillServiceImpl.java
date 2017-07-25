package com.epam.bench.service.impl;

import com.epam.bench.service.PrimarySkillService;
import com.epam.bench.domain.PrimarySkill;
import com.epam.bench.repository.PrimarySkillRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PrimarySkill.
 */
@Service
@Transactional
public class PrimarySkillServiceImpl implements PrimarySkillService{

    private final Logger log = LoggerFactory.getLogger(PrimarySkillServiceImpl.class);

    private final PrimarySkillRepository primarySkillRepository;

    public PrimarySkillServiceImpl(PrimarySkillRepository primarySkillRepository) {
        this.primarySkillRepository = primarySkillRepository;
    }

    /**
     * Save a primarySkill.
     *
     * @param primarySkill the entity to save
     * @return the persisted entity
     */
    @Override
    public PrimarySkill save(PrimarySkill primarySkill) {
        log.debug("Request to save PrimarySkill : {}", primarySkill);
        return primarySkillRepository.save(primarySkill);
    }

    /**
     *  Get all the primarySkills.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PrimarySkill> findAll(Pageable pageable) {
        log.debug("Request to get all PrimarySkills");
        return primarySkillRepository.findAll(pageable);
    }

    /**
     *  Get one primarySkill by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PrimarySkill findOne(Long id) {
        log.debug("Request to get PrimarySkill : {}", id);
        return primarySkillRepository.findOne(id);
    }

    /**
     *  Delete the  primarySkill by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PrimarySkill : {}", id);
        primarySkillRepository.delete(id);
    }
}
