package hibernate.service.interfaces;


public interface SecurityUserService {

    Boolean canAccessUser(int subjectId, String username);
}
