package hibernate.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "authorities", schema = "forum_schema")

public class Authority implements Serializable {
    @Id
    @GeneratedValue(generator = "authorities_id__generator", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name="authorities_id__generator", sequenceName = "forum_schema.forum_id_authorities_seq", allocationSize=1)
    @Column(name = "id", unique = true)
    private int id;

    @Column(name = "authority", nullable = false)
    private String authority;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users users;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }
}
