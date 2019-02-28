package hibernate.service.implementations;

import hibernate.dao.implementations.TopicDaoImpl;
import hibernate.dto.CommentDTO;
import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.model.Comment;
import hibernate.model.Subject;
import hibernate.model.Topic;
import hibernate.service.interfaces.BasicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class TopicServiceImpl<T> implements BasicService<TopicDTO> {

    @Autowired
    private TopicDaoImpl topicDao;

    @Transactional(readOnly = true)
    @Override
    public List<TopicDTO> getAll() {
        List<Topic> topicList = topicDao.getAll();
        List<TopicDTO> topics = new ArrayList<>();
        topicToTopicDTO(topicList, topics);
        return topics;
    }

    @Transactional(readOnly = true)
    @Override
    public TopicDTO getById(int id) {
        Topic topic = topicDao.getById(id);
        TopicDTO topicDTO = new TopicDTO();
        List<Subject> subjectList = topic.getSubjects();
        List<SubjectDTO> subjects = new ArrayList<>();
        subjectToSubjectDTO(subjectList,subjects);
        topicDTO.setId(topic.getId());
        topicDTO.setTopicName(topic.getName());
        topicDTO.setSubjects(subjects);
        return topicDTO;
    }

    @Transactional(readOnly = true)
    @Override
    public List<TopicDTO> getLikeName(String s) {
        List<Topic> topics = topicDao.getLikeName(s);
        List<TopicDTO> topicDTOList = new ArrayList<>();
        topicToTopicDTO(topics, topicDTOList);
        return topicDTOList;
    }

    @Transactional(readOnly = true)
    @Override
    public List<TopicDTO> getLikeNamePaginated(int page, int size, String s) {
        List<Topic> topicList = topicDao.getLikeName(s);
        List<TopicDTO> topics = new ArrayList<>();
        topicToTopicDTO(topicList, topics);
        int start = 0;
        start += (page-1) * size;
        int div = topics.size()/size;
        int mod = topics.size()%size;
        if (page-1 == div) return topics.subList(start,start + mod);
        if (start + size > topics.size()) return new ArrayList<>();
        return topics.subList(start, start + size);
    }

    @Transactional
    @Override
    public void add(TopicDTO modelDTO) {
        Topic model = new Topic();
        model.setName(modelDTO.getTopicName());
        topicDao.add(model);
    }

    @Transactional
    @Override
    public void update(int id, TopicDTO modelDTO) {
        Topic model = new Topic();
        model.setName(modelDTO.getTopicName());
        topicDao.update(id,model);
    }

    @Transactional
    @Override
    public void delete(int id) {
        topicDao.delete(id);
    }

    private void topicToTopicDTO(List<Topic> topicList, List<TopicDTO> topics) {
        for (Topic topic : topicList) {
            TopicDTO topicDTO = new TopicDTO();
            List<Subject> subjectList = topic.getSubjects();
            List<SubjectDTO> subjects = new ArrayList<>();
            subjectToSubjectDTO(subjectList,subjects);
            topicDTO.setId(topic.getId());
            topicDTO.setTopicName(topic.getName());
            topicDTO.setSubjects(subjects);
            topics.add(topicDTO);
        }
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


}
