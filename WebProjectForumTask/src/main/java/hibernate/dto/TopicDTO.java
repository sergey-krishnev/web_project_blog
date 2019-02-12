package hibernate.dto;

import hibernate.validation.annotations.BadWords;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.List;

public class TopicDTO {

    private int id;
    @NotEmpty(message = "NotEmpty-topicDTO-topicName")
    @BadWords(message = "BadWords-topicDTO-topicName")
    private String topicName;
    private List<SubjectDTO> subjects;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public List<SubjectDTO> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectDTO> subjects) {
        this.subjects = subjects;
    }
}
