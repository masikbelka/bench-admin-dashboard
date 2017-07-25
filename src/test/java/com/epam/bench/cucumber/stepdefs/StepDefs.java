package com.epam.bench.cucumber.stepdefs;

import com.epam.bench.BenchAdminConsoleApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = BenchAdminConsoleApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
