const interviewers = [
    { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
  ];

  INSERT INTO interview ( id, student, interviewer_id, appointment_id)
  VALUE (1, "Sylvia Palmer", "https://i.imgur.com/LpaY82x.png");
  INSERT INTO interview ( id, student, interviewer_id, appointment_id)
  VALUE (2, "Tori Malcolm", "https://i.imgur.com/Nmx0Qxo.png");
  INSERT INTO interview ( id, student, interviewer_id, appointment_id)
  VALUE (3, "Mildred Nazir", "https://i.imgur.com/T2WwVfS.png");
  INSERT INTO interview ( id, student, interviewer_id, appointment_id)
  VALUE (4, "Cohana Roy", "https://i.imgur.com/FK8V841.jpg");
  INSERT INTO interview ( id, student, interviewer_id, appointment_id)
  VALUE (5, "Sven Jones", "https://i.imgur.com/twYrpay.jpg");