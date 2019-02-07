package hibernate.model;

import javax.persistence.*;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "comment", schema = "forum_schema")
public class Comment implements Serializable {

    @Id
    @GeneratedValue(generator = "comment_id__generator", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name="comment_id__generator", sequenceName = "forum_schema.forum_id_comment_seq", allocationSize=1)
    @Column(name = "id", unique = true)
    private int id;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users users;

    public Comment() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate() {
        return date;
    }

    public String getFormattedDateSending() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return df.format(date);
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Comment(String message, Date date, Subject subject, Users users) {
        this.message = message;
        this.date = date;
        this.subject = subject;
        this.users = users;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", date=" + date +
                ", subject=" + subject +
                ", users=" + users +
                '}';
    }
}
