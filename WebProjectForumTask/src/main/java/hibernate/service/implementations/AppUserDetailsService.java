package hibernate.service.implementations;

import hibernate.dao.implementations.AppUserPrincipal;
import hibernate.dao.implementations.UsersDaoImpl;
import hibernate.dao.interfaces.CRUDDao;
import hibernate.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersDaoImpl usersDao;

    public void setUsersDao(UsersDaoImpl usersDao) {
        this.usersDao = usersDao;
    }

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String userName) {
        Users users = usersDao.getByName(userName);
        if (users == null) {
            throw new UsernameNotFoundException(userName);
        }
        return new AppUserPrincipal(users);
    }
}
