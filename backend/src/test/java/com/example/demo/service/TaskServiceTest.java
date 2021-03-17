package com.example.demo.service;


import com.example.demo.entity.Task;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.TaskRepository;
import org.assertj.core.api.Fail;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static java.util.Optional.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {
    @Mock
    private TaskRepository taskRepository;
    //   @InjectMocks - заменяет эту строчку
    //   private TaskService taskService = new TaskService(taskRepository);
    @InjectMocks // То есть инициализирует (инжектирует) объект, помеченный @Mock
    private TaskService taskService;

    private final Task task = Task.builder()
            .id(100L)
            .text("Task_Text")
            .isComplete(false) // Добавляем поле isComplete значение, для корректной проверки
            .build();

    //Методы тестов должны быть public
//    @Test
//    public void findAll(){
//        //Этап передачи тестовых данных
//        //Мы говорим, что если вызовут taskRepository то он должен вернуть List с одним объектом task
//        when(taskRepository.findAll()).thenReturn(Collections.singletonList(task)); //Мы говорим, что если вызовут taskRepository то он должен вернуть List с одним объектом task
//
//        List<Task> result = taskService.findAll();
//
//        //Этап проверки результат
//        assertThat(result, hasSize(1));
//        assertThat(result.get(0), equalTo(task)); // Проверяем сравнение элемента task с тем,что мы получили из taskRepository
//    }
    @Test
    public void findById(){
        //Этап передачи тестовых данных
        //Мы говорим, что если вызовут taskRepository то он должен вернуть List с одним объектом task
        when(taskRepository.findById(task.getId())).thenReturn(of(task)); //Мы говорим, что если вызовут taskRepository то он должен вернуть List с одним объектом task

        Task result = taskService.findById(task.getId());

        assertThat(result.getId(),equalTo(task.getId()));
    }
    @Test
    public void findByIdException(){
        //Этап передачи тестовых данных
        when(taskRepository.findById(task.getId())).thenReturn(Optional.empty()); //Мы говорим, что если вызовут taskRepository то он должен вернуть List с одним объектом task
        // Мой велосипед
        NotFoundException notFoundException = new NotFoundException(task.getId());
        try {
            Task result = taskService.findById(task.getId());
        } catch (NotFoundException e){
            assertThat(e.getMessage(),equalTo(notFoundException.getMessage()));
            return;
        } catch (Exception e){
            fail();
        }
        fail();
    }

    // Протестировать добавление информации тест.
//    @Test
//    public void addTest(){
//        when(taskRepository.save(eq(task))).thenReturn(task);
//
//        Task result = taskService.add(task);
//        assertThat(result, equalTo(task));
//        // кол-во вызовов taskRepository
//        verify(taskRepository,times(1)).save(task); // Сколько раз был вызван mock, через точку, какую
//        //операцию проверяем. Например .save(task)
//        // Проверяем дату создания на не нулевую
//        assertThat(task.getCreateDate(),isNotNull());
//        // Проверка даты создания
//            Calendar calendar = new GregorianCalendar();
//            calendar.add(Calendar.SECOND,-1);
//
//        assertThat(task.getCreateDate(),greaterThan(calendar.getTime()));
//
//    }
    // Самостоятельно методы save (обновление) и delete (удаление)

    @Test
    public void saveTestTextNull(){
        Task taskTest = Task.builder() // Создали task с пустым полем текста
                .id(100L)
                .text("Text")
                .isComplete(false)
                .build();
        Task taskInto = Task.builder() // Создали task с пустым полем текста
                .id(100L)
                .text(null)
                .isComplete(false) // Добавляем поле isComplete значение, для корректной проверки
                .build();
        when(taskRepository.findById(taskTest.getId())).thenReturn(Optional.of(taskInto));
        when(taskRepository.save(taskInto)).thenReturn(taskInto);

        Task result = taskService.save(taskTest,taskTest.getId());
        // Проверка даты обновления
        Calendar calendar = new GregorianCalendar();
        calendar.add(Calendar.SECOND,-1);

        assertThat(result.getUpdateDate(),is(notNullValue()));
        assertThat(result.getUpdateDate(),greaterThan(calendar.getTime()));
        assertThat(result.getText(),equalTo(taskTest.getText()));
        assertThat(result.getIsComplete(),equalTo(taskTest.getIsComplete()));
    }

    @Test
    public void deleteTest(){
        when(taskRepository.findById(task.getId())).thenReturn(Optional.of(task));

        taskService.delete(task.getId());

        verify(taskRepository,times(1)).deleteById(task.getId());
    }
}
