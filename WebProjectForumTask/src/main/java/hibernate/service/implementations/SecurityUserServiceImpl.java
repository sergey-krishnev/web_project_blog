package hibernate.service.implementations;

import hibernate.dao.implementations.SubjectDaoImpl;
import hibernate.model.Subject;
import hibernate.service.interfaces.SecurityUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SecurityUserServiceImpl implements SecurityUserService {

    @Autowired
    private SubjectDaoImpl usersDao;

    public void setUsersDao(SubjectDaoImpl usersDao) {
        this.usersDao = usersDao;
    }

    @Transactional(readOnly = true)
    @Override
    public Boolean canAccessUser(int subjectId, String username) {
        Subject subject = usersDao.getById(subjectId);
        return subject.getUsers().getNickname().equals(username);
    }
}
