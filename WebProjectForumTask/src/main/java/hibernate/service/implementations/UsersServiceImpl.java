package hibernate.service.implementations;

import hibernate.dao.implementations.UsersDaoImpl;
import hibernate.dto.UsersDTO;
import hibernate.model.Users;
import hibernate.service.interfaces.BasicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsersServiceImpl<T> implements BasicService<UsersDTO> {

    @Autowired
    private UsersDaoImpl usersDao;

    @Transactional(readOnly = true)
    @Override
    public List<UsersDTO> getAll() {
        List<Users> usersList = usersDao.getAll();
        List<UsersDTO> users = new ArrayList<>();
        userToUserDTO(usersList, users);
        return users;
    }

    @Transactional(readOnly = true)
    @Override
    public UsersDTO getById(int id) {
        Users users = usersDao.getById(id);
        UsersDTO usersDTO = new UsersDTO();
        usersDTO.setId(users.getId());
        usersDTO.setUserName(users.getNickname());
        usersDTO.setPassword(users.getPassword());
        usersDTO.setEmail(users.getEmail());
        usersDTO.setFirstName(users.getFirstName());
        usersDTO.setLastName(users.getLastName());
        return usersDTO;
    }

    @Transactional(readOnly = true)
    @Override
    public List<UsersDTO> getLikeName(String s) {
        List<Users> usersList = usersDao.getLikeName(s);
        List<UsersDTO> users = new ArrayList<>();
        userToUserDTO(usersList, users);
        return users;
    }

    @Transactional(readOnly = true)
    @Override
    public List<UsersDTO> getLikeNamePaginated(int page, int size, String s) {
        List<Users> usersList = usersDao.getLikeName(s);
        List<UsersDTO> users = new ArrayList<>();
        userToUserDTO(usersList, users);
        int start = 0;
        start += (page-1) * size;
        int div = users.size()/size;
        int mod = users.size()%size;
        if (page-1 == div) return users.subList(start,start + mod);
        if (start + size > users.size()) return new ArrayList<>();
        return users.subList(start, start + size);
    }

    @Transactional
    @Override
    public void add(UsersDTO modelDTO) {
        Users model = new Users();
        model.setNickname(modelDTO.getUserName());
        model.setPassword(modelDTO.getPassword());
        model.setEmail(modelDTO.getEmail());
        model.setFirstName(modelDTO.getFirstName());
        model.setLastName(modelDTO.getLastName());
        usersDao.add(model);
    }

    @Transactional
    @Override
    public void update(int id, UsersDTO modelDTO) {
        Users model = new Users();
        model.setNickname(modelDTO.getUserName());
        model.setPassword(modelDTO.getPassword());
        model.setEmail(modelDTO.getEmail());
        model.setFirstName(modelDTO.getFirstName());
        model.setLastName(modelDTO.getLastName());
        usersDao.update(id,model);
    }

    @Transactional
    @Override
    public void delete(int id) {
        usersDao.delete(id);
    }

    private void userToUserDTO(List<Users> usersList, List<UsersDTO> users) {
        for (Users user : usersList) {
            UsersDTO usersDTO = new UsersDTO();
            usersDTO.setId(user.getId());
            usersDTO.setUserName(user.getNickname());
            usersDTO.setPassword(user.getPassword());
            usersDTO.setEmail(user.getEmail());
            usersDTO.setFirstName(user.getFirstName());
            usersDTO.setLastName(user.getLastName());
            users.add(usersDTO);
        }
    }
}
