package com.example.demo.repository;

import com.example.demo.TodoMainApplication;
import com.example.demo.entity.Task;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = TodoMainApplication.class)
public class TaskRepositoryTest {

    @Autowired
    private TaskRepository taskRepository;

    private final Task task = Task.builder()
            .id(100L)
            .text("TASK_TEXT")
            .build();

    @AfterEach // Анотация, которая позволяет запускать метод после каждого теста.
    // Удаляем всё после каждого теста
    public void clear(){
        taskRepository.deleteAll();
    }

    @Test
    public void findAllByTextIgnoreCaseIsContaining(){
        taskRepository.save(task);

        List<Task> result = taskRepository.findAllByTextIgnoreCaseIsContaining("ask");

        assertThat(result,hasSize(1));
        assertThat(result.get(0).getText(),equalTo(task.getText()));
    }
}
