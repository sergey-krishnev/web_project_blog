package hibernate.service.implementations;

import hibernate.dao.implementations.SubjectDaoImpl;
import hibernate.dao.interfaces.BasicDao;
import hibernate.model.Subject;
import hibernate.service.interfaces.SecurityUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SecurityUserServiceImpl implements SecurityUserService {

    @Autowired
    @Qualifier("subjectDao")
    private BasicDao subjectDao;

    public void setUsersDao(SubjectDaoImpl usersDao) {
        this.subjectDao = subjectDao;
    }

    @Transactional(readOnly = true)
    @Override
    public Boolean canAccessUser(int subjectId, String username) {
        Subject subject = (Subject) subjectDao.getById(subjectId);
        return subject.getUsers().getNickname().equals(username);
    }
}
