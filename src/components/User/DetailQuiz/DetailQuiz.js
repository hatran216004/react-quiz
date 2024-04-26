import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../../services/apiServices";
import _ from "lodash";

const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id;

    useEffect(() => {
        fetchQuestion();
    }, [quizId]);

    const fetchQuestion = async () => {
        const res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    // value: array include objects with same id
                    // key: id
                    let answers = []; // array include answers
                    let questionDesc,
                        image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDesc = item.description;
                            image = item.image;
                        }
                        answers.push(item.answers);
                    });
                    return { questionId: key, answers, questionDesc, image };
                })
                .value();
        }
    };

    return <div className="detail-quiz-container">DetailQuiz</div>;
};

export default DetailQuiz;
