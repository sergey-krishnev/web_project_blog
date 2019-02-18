package hibernate.service.implementations;

import hibernate.dao.interfaces.CRUDDao;
import hibernate.model.Subject;
import hibernate.service.interfaces.SecurityUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SecurityUserServiceImpl implements SecurityUserService {

    @Autowired
    private CRUDDao crudDao;

    public void setCrudDao(CRUDDao crudDao) {
        this.crudDao = crudDao;
    }

    @Transactional(readOnly = true)
    @Override
    public Boolean canAccessUser(int subjectId, String username) {
        Subject subject = crudDao.searchSubjectById(subjectId);
        return subject.getUsers().getNickname().equals(username);
    }
}
