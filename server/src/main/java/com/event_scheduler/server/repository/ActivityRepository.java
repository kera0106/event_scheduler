package com.event_scheduler.server.repository;

import com.event_scheduler.server.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    Activity findActivityById(Long activityId);

    @Query("select activity from Activity activity, EventAccount eventAccount " +
            "   where eventAccount.account.id = ?1 " +
            "       and eventAccount.isAccepted = true" +
            "       and activity.event = eventAccount.event " +
            "       and " +
            "           ((activity.start <= ?2 and activity.finish >= ?2) " +
            "           or " +
            "           (activity.start >= ?2 and activity.start <= ?3))")
    List<Activity> activitiesAtPeriod(Long accountId, LocalDateTime startOfPeriod, LocalDateTime finishOfPeriod);

    @Query("select activity from Activity activity, EventAccount eventAccount " +
            "   where eventAccount.account.id = ?1 " +
            "       and eventAccount.isAccepted = true" +
            "       and activity.event = eventAccount.event " +
            "       and activity.event.id <> ?2" +
            "       and " +
            "           ((activity.start <= ?3 and activity.finish >= ?3) " +
            "           or " +
            "           (activity.start >= ?3 and activity.start <= ?4))")
    List<Activity> activitiesAtPeriodExceptEvent(Long accountId, Long eventId, LocalDateTime startOfPeriod, LocalDateTime finishOfPeriod);
}
