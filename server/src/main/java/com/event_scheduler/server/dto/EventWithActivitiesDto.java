package com.event_scheduler.server.dto;

import lombok.Data;

import java.util.List;

@Data
public class EventWithActivitiesDto {
    private Long id;
    private String name;
    private String description;
    private List<ActivityDto> activities;
}
