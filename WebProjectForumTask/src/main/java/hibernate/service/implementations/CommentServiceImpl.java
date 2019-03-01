package hibernate.service.implementations;

import hibernate.dao.implementations.CommentDaoImpl;
import hibernate.dao.implementations.SubjectDaoImpl;
import hibernate.dao.implementations.UsersDaoImpl;
import hibernate.dao.interfaces.BasicDao;
import hibernate.dto.CommentDTO;
import hibernate.model.Comment;
import hibernate.model.Subject;
import hibernate.model.Users;
import hibernate.service.interfaces.BasicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service("commentService")
public class CommentServiceImpl<T> implements BasicService<CommentDTO> {

    @Autowired
    @Qualifier("commentDao")
    private BasicDao commentDao;

    @Autowired
    @Qualifier("subjectDao")
    private BasicDao subjectDao;

    @Autowired
    @Qualifier("usersDao")
    private BasicDao usersDao;

    @Transactional(readOnly = true)
    @Override
    public List<CommentDTO> getAll() {
        List<Comment> commentList = commentDao.getAll();
        List<CommentDTO> comments = new ArrayList<>();
        commentToCommentDTO(commentList, comments);
        return comments;
    }

    @Transactional(readOnly = true)
    @Override
    public CommentDTO getById(int id) {
        Comment comment = (Comment) commentDao.getById(id);
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setUserName(comment.getUsers().getNickname());
        commentDTO.setSubjectName(comment.getSubject().getName());
        commentDTO.setTopicName(comment.getSubject().getTopic().getName());
        commentDTO.setMessage(comment.getMessage());
        commentDTO.setDate(comment.getFormattedDateSending());
        return commentDTO;
    }

    @Override
    public boolean getByName(String name) {
        List<Subject> subjects = subjectDao.getAll();
        for (Subject subject : subjects) {
            if (name.equals(subject.getName())) {
                return true;
            }
        }
        return false;
    }

    @Transactional(readOnly = true)
    @Override
    public List<CommentDTO> getLikeName(String s) {
        List<Comment> commentList = commentDao.getLikeName(s);
        List<CommentDTO> comments = new ArrayList<>();
        commentToCommentDTO(commentList, comments);
        return comments;
    }

    @Transactional(readOnly = true)
    @Override
    public List<CommentDTO> getLikeNamePaginated(int page, int size, String s) {
        List<Comment> commentList = commentDao.getLikeName(s);
        List<CommentDTO> comments = new ArrayList<>();
        commentToCommentDTO(commentList, comments);
        int start = 0;
        start += (page-1) * size;
        int div = comments.size()/size;
        int mod = comments.size()%size;
        if (page-1 == div) return comments.subList(start,start + mod);
        if (start + size > comments.size()) return new ArrayList<>();
        return comments.subList(start, start + size);
    }

    @Transactional(readOnly = true)
    @Override
    public List<CommentDTO> getCustomLikeNamePaginated(int page, int size, String s, int id) {
        return null;
    }

    @Transactional
    @Override
    public void add(CommentDTO modelDTO) {
        Comment model = new Comment();
        model.setMessage(modelDTO.getMessage());
        model.setDate(stringAsDate(modelDTO.getDate()));
        model.setUsers((Users) usersDao.getByName(modelDTO.getUserName()));
        model.setSubject((Subject) subjectDao.getByName(modelDTO.getSubjectName()));
        commentDao.add(model);
    }

    @Transactional
    @Override
    public void update(int id, CommentDTO modelDTO) {
        Comment model = new Comment();
        model.setMessage(modelDTO.getMessage());
        model.setDate(stringAsDate(modelDTO.getDate()));
        model.setUsers((Users) usersDao.getByName(modelDTO.getUserName()));
        model.setSubject((Subject) subjectDao.getByName(modelDTO.getSubjectName()));
        commentDao.update(id, model);
    }

    @Transactional
    @Override
    public void delete(int id) {
        commentDao.delete(id);
    }

    private void commentToCommentDTO(List<Comment> commentList, List<CommentDTO> comments) {
        for (Comment comment : commentList) {
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setId(comment.getId());
            commentDTO.setUserName(comment.getUsers().getNickname());
            commentDTO.setSubjectName(comment.getSubject().getName());
            commentDTO.setTopicName(comment.getSubject().getTopic().getName());
            commentDTO.setMessage(comment.getMessage());
            commentDTO.setDate(comment.getFormattedDateSending());
            comments.add(commentDTO);
        }
    }

    private static java.sql.Date stringAsDate(String s) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        java.util.Date date = null;
        try {
            date = sdf.parse(s);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new java.sql.Date(date.getTime());
    }

}
