package hibernate.dto;

import hibernate.annotations.BadWords;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.List;
import java.util.regex.Pattern;

public class SubjectDTO {
    private int id;
    @BadWords(message = "BadWords-subjectDTO-subjectName")
    @NotEmpty(message = "NotEmpty-commentDTO-subjectName")
    private String subjectName;
    @NotEmpty(message = "NotEmpty-commentDTO-userName")
    private String userName;
    @NotEmpty(message = "NotEmpty-commentDTO-topicName")
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


