package hibernate.dto;

import hibernate.validation.annotations.BadWords;
import hibernate.validation.annotations.SameSubjectName;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.List;

public class SubjectDTO {
    private int id;
    @BadWords(message = "BadWords-subjectDTO-subjectName")
    @NotEmpty(message = "NotEmpty-subjectDTO-subjectName")
    @SameSubjectName
    private String subjectName;
    @NotEmpty(message = "NotEmpty-subjectDTO-userName")
    private String userName;
    @NotEmpty(message = "NotEmpty-subjectDTO-topicName")
    private String topicName;
    private String date;
    @NotEmpty(message = "NotEmpty-subjectDTO-text")
    @BadWords(message = "BadWords-subjectDTO-text")
    private String text;
    private List<CommentDTO> comments;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<CommentDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentDTO> comments) {
        this.comments = comments;
    }
}


