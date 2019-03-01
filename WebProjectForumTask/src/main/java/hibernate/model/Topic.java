package hibernate.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "topic", schema = "forum_schema")

public class Topic implements Serializable {

    @Id
    @GeneratedValue(generator = "topic_id__generator", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name="topic_id__generator", sequenceName = "forum_schema.forum_id_topic_seq", allocationSize=1)
    @Column(name = "id", unique = true)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "topic")
    private List<Subject> subjects = new ArrayList<Subject>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Subject> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<Subject> subjects) {
        this.subjects = subjects;
    }

    @Override
    public String toString() {
        return "Topic{" +
                "name='" + name + '\'' +
                '}';
    }
}
