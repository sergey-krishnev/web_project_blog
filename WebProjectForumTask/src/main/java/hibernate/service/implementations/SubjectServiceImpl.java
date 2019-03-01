package hibernate.service.implementations;

import hibernate.dao.interfaces.BasicDao;
import hibernate.dto.CommentDTO;
import hibernate.dto.SubjectDTO;
import hibernate.model.Comment;
import hibernate.model.Subject;
import hibernate.model.Topic;
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

@Service("subjectService")
public class SubjectServiceImpl<T> implements BasicService<SubjectDTO> {

    @Autowired
    @Qualifier("subjectDao")
    private BasicDao subjectDao;

    @Autowired
    @Qualifier("usersDao")
    private BasicDao usersDao;

    @Autowired
    @Qualifier("topicDao")
    private BasicDao topicDao;

    @Transactional(readOnly = true)
    @Override
    public List<SubjectDTO> getAll() {
        List<Subject> usersList = subjectDao.getAll();
        List<SubjectDTO> users = new ArrayList<>();
        subjectToSubjectDTO(usersList, users);
        return users;
    }

    @Transactional(readOnly = true)
    @Override
    public SubjectDTO getById(int id) {
        Subject subject = (Subject) subjectDao.getById(id);
        SubjectDTO subjectDTO = new SubjectDTO();
        List<Comment> commentList = subject.getComments();
        List<CommentDTO> comments = new ArrayList<>();
        commentToCommentDTO(commentList,comments);
        subjectDTO.setId(subject.getId());
        subjectDTO.setUserName(subject.getUsers().getNickname());
        subjectDTO.setSubjectName(subject.getName());
        subjectDTO.setDate(subject.getFormattedDateSending());
        subjectDTO.setTopicName(subject.getTopic().getName());
        subjectDTO.setText(subject.getText());
        subjectDTO.setComments(comments);
        return subjectDTO;
    }

    @Override
    public boolean getByName(String name) {
        return false;
    }

    @Transactional(readOnly = true)
    @Override
    public List<SubjectDTO> getLikeName(String s) {
        List<Subject> subjectList = subjectDao.getLikeName(s);
        List<SubjectDTO> subjects = new ArrayList<>();
        subjectToSubjectDTO(subjectList, subjects);
        return subjects;
    }

    @Transactional(readOnly = true)
    @Override
    public List<SubjectDTO> getLikeNamePaginated(int page, int size, String s) {
        List<Subject> subjectList = subjectDao.getLikeName(s);
        List<SubjectDTO> subjects = new ArrayList<>();
        subjectToSubjectDTO(subjectList, subjects);
        int start = 0;
        start += (page-1) * size;
        int div = subjects.size()/size;
        int mod = subjects.size()%size;
        if (page-1 == div) return subjects.subList(start,start + mod);
        if (start + size > subjects.size()) return new ArrayList<>();
        return subjects.subList(start, start + size);
    }

    @Transactional(readOnly = true)
    @Override
    public List<SubjectDTO> getCustomLikeNamePaginated(int page, int size, String s, int id) {
        List<Subject> subjectList = ((Topic) topicDao.getById(id)).getSubjects();
        List<SubjectDTO> subjects = new ArrayList<>();
        subjectToSubjectDTO(subjectList, subjects);
        int start = 0;
        start += (page-1) * size;
        int div = subjects.size()/size;
        int mod = subjects.size()%size;
        if (page-1 == div) return subjects.subList(start,start + mod);
        if (start + size > subjects.size()) return new ArrayList<>();
        return subjects.subList(start, start + size);
    }

    @Transactional
    @Override
    public void add(SubjectDTO modelDTO) {
        Subject model = new Subject();
        model.setName(modelDTO.getSubjectName());
        model.setDate(stringAsDate(modelDTO.getDate()));
        model.setText(modelDTO.getText());
        model.setUsers((Users) usersDao.getByName(modelDTO.getUserName()));
        model.setTopic((Topic) topicDao.getByName(modelDTO.getTopicName()));
        subjectDao.add(model);
    }

    @Transactional
    @Override
    public void update(int id, SubjectDTO modelDTO) {
        Subject model = new Subject();
        model.setName(modelDTO.getSubjectName());
        model.setDate(stringAsDate(modelDTO.getDate()));
        model.setText(modelDTO.getText());
        model.setUsers((Users) usersDao.getByName(modelDTO.getUserName()));
        model.setTopic((Topic) topicDao.getByName(modelDTO.getTopicName()));
        subjectDao.update(id,model);
    }

    @Transactional
    @Override
    public void delete(int id) {
        subjectDao.delete(id);
    }

    private void subjectToSubjectDTO(List<Subject> subjects, List<SubjectDTO> subjectDTOList) {
        for (Subject subject : subjects) {
            SubjectDTO subjectDTO = new SubjectDTO();
            List<Comment> commentList = subject.getComments();
            List<CommentDTO> comments = new ArrayList<>();
            commentToCommentDTO(commentList,comments);
            subjectDTO.setId(subject.getId());
            subjectDTO.setUserName(subject.getUsers().getNickname());
            subjectDTO.setSubjectName(subject.getName());
            subjectDTO.setTopicName(subject.getTopic().getName());
            subjectDTO.setDate(subject.getFormattedDateSending());
            subjectDTO.setText(subject.getText());
            subjectDTO.setComments(comments);
            subjectDTOList.add(subjectDTO);
        }
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
