package hibernate.dto;

import hibernate.annotations.BadWords;
import org.hibernate.validator.constraints.NotEmpty;

public class CommentDTO {

    private int id;
    @NotEmpty(message = "NotEmpty-commentDTO-userName")
    private String userName;
    @NotEmpty(message = "NotEmpty-commentDTO-topicName")
    private String topicName;
    @NotEmpty(message = "NotEmpty-commentDTO-subjectName")
    private String subjectName;
    @NotEmpty(message = "NotEmpty-commentDTO-message")
    @BadWords
    private String message;
    private String date;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
