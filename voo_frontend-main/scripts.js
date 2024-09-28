/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getList = async () => {
  let url = 'http://127.0.0.1:5000/passageiros';  // URL da API
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Passageiros retornados: ", data.passageiros);  // Exibe todos os passageiros
      // Itera sobre a lista de passageiros e insere na tabela
      data.passageiros.forEach((passageiro, index) => {
        console.log(`Inserindo passageiro ${index + 1}:`, passageiro);  // Exibe cada passageiro
        insertList(
          passageiro['name'],
          passageiro['age'],
          passageiro['gender'],
          passageiro['customer_type'],
          passageiro['type_of_travel'],
          passageiro['flight_distance'],
          passageiro['class_type'],
          passageiro['seat_comfort'],
          passageiro['inflight_entertainment'],
          passageiro['checkin_service'],
          passageiro['inflight_service'],
          passageiro['cleanliness'],
          passageiro['departure_delay'],
          passageiro['arrival_delay'],
          passageiro['id'],            // ID do passageiro
          passageiro['satisfaction']   // resposta do modelo
        );
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()

/*
  --------------------------------------------------------------------------------------
  Chamada listas de seleção
  --------------------------------------------------------------------------------------
*/

document.addEventListener('DOMContentLoaded', function () {
  // Função para gerar opções de 1 a 5
  function generateOptions(selectId) {
      const selectElement = document.getElementById(selectId);
      for (let i = 1; i <= 5; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.text = i;
          selectElement.appendChild(option);
      }
  }

  // Lista de IDs dos elementos select que precisam de opções de 1 a 5
  const serviceFields = [
      'newSeatComfort',
      'newInflightEntertainment',
      'newCheckinService',
      'newInflightService',
      'newCleanliness'
  ];

  // Gerar as opções de 1 a 5 para cada campo de serviço
  serviceFields.forEach(fieldId => generateOptions(fieldId));

  // Gerar opções de idade de 0 a 120 para o campo de idade
  const ageSelect = document.getElementById('newPassengerAge');
  for (let i = 0; i <= 120; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      ageSelect.appendChild(option);
  }
});

  // Evento de clique no botão "Adicionar"
  const form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Chama a função para adicionar um novo item
    newItem();
  });

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (PassengerName, PassengerAge, PassengerGender, CustomerType, 
  TypeOfTravel, FlightDistance, ClassType, SeatComfort, 
  InflightEntertainment, CheckinService, InflightService, 
  Cleanliness, DepartureDelay, ArrivalDelay) => {

  const formData = new FormData();

  // Adicionando os campos correspondentes para o passageiro
  formData.append('name', PassengerName);
  formData.append('age', PassengerAge);
  formData.append('gender', PassengerGender);
  formData.append('customer_type', CustomerType);
  formData.append('type_of_travel', TypeOfTravel);
  formData.append('flight_distance', FlightDistance);
  formData.append('class_type', ClassType);
  formData.append('seat_comfort', SeatComfort);
  formData.append('inflight_entertainment', InflightEntertainment);
  formData.append('checkin_service', CheckinService);
  formData.append('inflight_service', InflightService);
  formData.append('cleanliness', Cleanliness);
  formData.append('departure_delay', DepartureDelay);
  formData.append('arrival_delay', ArrivalDelay);

  let url = 'http://127.0.0.1:5000/passageiro';
  return fetch(url, {
    method: 'POST',
    body: formData
  });
};

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão delete para cada item da lista
  --------------------------------------------------------------------------------------
*/

// Função para criar um botão delete para cada item da lista
const insertButton = (parent) => {
  let btn = document.createElement("button");
  btn.className = "deleteBtn center-button";
  btn.textContent = "Delete";

  // Adicionando o evento de clique
  btn.addEventListener("click", async function () {
    let row = this.parentNode.parentNode;  // Seleciona a linha correspondente ao botão
    let passageiroName = row.cells[0].textContent;  // Pega o nome do passageiro da primeira célula

    console.log(`Nome do passageiro selecionado: ${passageiroName}`);
    
    if (!passageiroName) {
      console.error("Nome do passageiro não encontrado.");
      return;
    }

    this.disabled = true;  // Desabilita o botão enquanto o processo de exclusão ocorre

    try {
      await deletePassageiro(passageiroName);  // Chama a função de exclusão com o nome
      row.remove();  // Remove a linha da tabela ao finalizar a exclusão
    } catch (error) {
      console.error("Erro ao deletar passageiro:", error);
      alert('Erro ao deletar passageiro.');
    }
  });

  parent.appendChild(btn);
};

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/

// Função para deletar um item da lista do servidor via requisição DELETE
const deletePassageiro = async (passageiroName) => {
  let url = `http://127.0.0.1:5000/passageiro?name=${encodeURIComponent(passageiroName)}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar passageiro');
    }

    const data = await response.json();
    console.log('Resposta do servidor:', data);

    console.log(`Passageiro removido com sucesso: ${data.message}`);
    alert('Passageiro removido com sucesso!');

  } catch (error) {
    console.error(`Erro ao deletar passageiro com nome ${passageiroName}:`, error);
    alert('Erro ao deletar passageiro.');
  }
};

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com todos os atributos da experiência de voo
  --------------------------------------------------------------------------------------
*/
const newItem = async () => {
  // Coletando valores dos campos
  let Name = document.getElementById("newPassengerName").value;
  let Age = document.getElementById("newPassengerAge").value;
  let Gender = document.getElementById("newPassengerGender").value;
  let CustomerType = document.getElementById("newCustomerType").value;
  let TypeOfTravel = document.getElementById("newTypeOfTravel").value;
  let FlightDistance = document.getElementById("newFlightDistance").value;
  let ClassType = document.getElementById("newClassType").value;
  let SeatComfort = document.getElementById("newSeatComfort").value;
  let InflightEntertainment = document.getElementById("newInflightEntertainment").value;
  let CheckinService = document.getElementById("newCheckinService").value;
  let InflightService = document.getElementById("newInflightService").value;
  let Cleanliness = document.getElementById("newCleanliness").value;
  let DepartureDelay = document.getElementById("newDepartureDelay").value;
  let ArrivalDelay = document.getElementById("newArrivalDelay").value;

  // Converter valores coletados que são números para o tipo correto
  Gender = Number(Gender);
  CustomerType = Number(CustomerType);
  ClassType = Number(ClassType);
  TypeOfTravel = Number(TypeOfTravel);
  
  // Verificar se todos os campos foram preenchidos
  if (
      Name === "" ||
      Age === "" ||
      Gender === "" ||
      CustomerType === "" ||
      TypeOfTravel === "" ||
      FlightDistance === "" ||
      ClassType === "" ||
      SeatComfort === "" ||
      InflightEntertainment === "" ||
      CheckinService === "" ||
      InflightService === "" ||
      Cleanliness === "" ||
      DepartureDelay === "" ||
      ArrivalDelay === ""
  ) {
      alert("Por favor, preencha todos os campos antes de adicionar!");
      return;
  }

  try {
      // Fazendo a requisição POST com os dados do passageiro e da experiência de voo
      const response = await postItem(
          Name,
          Age,
          Gender,
          CustomerType,
          TypeOfTravel,
          FlightDistance,
          ClassType,
          SeatComfort,
          InflightEntertainment,
          CheckinService,
          InflightService,
          Cleanliness,
          DepartureDelay,
          ArrivalDelay
      );

      // Verifique se a resposta do servidor foi bem-sucedida (status 200-299)
      if (!response.ok) {
          throw new Error('Falha na requisição ao servidor');
      }

      // Convertendo a resposta para JSON
      const responseData = await response.json();

      // Extraindo o valor de satisfação retornado pelo backend
      const Satisfaction = responseData.satisfaction;

      // Inserindo o novo item na tabela de exibição
      insertList(
          Name,
          Age,
          Gender,
          CustomerType,
          TypeOfTravel,
          FlightDistance,
          ClassType,
          SeatComfort,
          InflightEntertainment,
          CheckinService,
          InflightService,
          Cleanliness,
          DepartureDelay,
          ArrivalDelay,
          responseData.id,  // ID retornado do backend
          Satisfaction      // Satisfação retornada do backend
      );

      // Exibir feedback de satisfação
      const feedbackElement = document.getElementById("feedback");
      feedbackElement.classList.remove("hidden");

      if (Satisfaction) {
          feedbackElement.textContent = `${Name} está satisfeit(a)o!`;
          feedbackElement.classList.add("satisfied");
          feedbackElement.classList.remove("unsatisfied");
      } else {
          feedbackElement.textContent = `${Name} está insatisfeit(a)o!`;
          feedbackElement.classList.add("unsatisfied");
          feedbackElement.classList.remove("satisfied");
      }

      alert("Passageiro adicionado à base com sucesso!");

  } catch (error) {
      console.error("Erro ao adicionar passageiro:", error);
      alert("Erro ao adicionar passageiro.");
  }
};

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item na tabela após acionamento do botão adicionar
  --------------------------------------------------------------------------------------
*/

const insertList = (Name, Age, Gender, CustomerType, TypeOfTravel, FlightDistance, 
  ClassType, SeatComfort, InflightEntertainment, CheckinService, InflightService, 
  Cleanliness, DepartureDelay, ArrivalDelay, passageiroId, Satisfaction) => {

  var table = document.getElementById('myTable');
  var row = table.insertRow();

  // Mapeamento dos valores para exibição
  const genderText = Gender === 1 ? 'Masculino' : 'Feminino';
  const customerTypeText = CustomerType === 1 ? 'Passageiro Frequente' : 'Passageiro Eventual';
  const classTypeText = ClassType === 0 ? 'Business' : ClassType === 1 ? 'Econômica' : 'Econômica Plus';
  const typeOfTravelText = TypeOfTravel === 0 ? 'Negócios' : 'Pessoal';
  
  // Ajuste correto para valores booleanos no campo de satisfação
  const satisfactionText = (Satisfaction === true || Satisfaction === "true") ? 'Satisfeito' : 'Insatisfeito';

  // Insere o id_passageiro como um atributo data-id na linha
  row.setAttribute('data-id', passageiroId);

  // Insere cada atributo da experiência de voo em uma célula diferente na mesma linha
  row.insertCell(0).textContent = Name;
  row.insertCell(1).textContent = Age;
  row.insertCell(2).textContent = genderText;  // Exibir gênero como texto
  row.insertCell(3).textContent = customerTypeText;  // Exibir tipo de passageiro como texto
  row.insertCell(4).textContent = typeOfTravelText;  // Exibir motivo de viagem como texto
  row.insertCell(5).textContent = FlightDistance;
  row.insertCell(6).textContent = classTypeText;  // Exibir classe de voo como texto
  row.insertCell(7).textContent = SeatComfort;
  row.insertCell(8).textContent = InflightEntertainment;
  row.insertCell(9).textContent = CheckinService;
  row.insertCell(10).textContent = InflightService;
  row.insertCell(11).textContent = Cleanliness;
  row.insertCell(12).textContent = DepartureDelay;
  row.insertCell(13).textContent = ArrivalDelay;
  row.insertCell(14).textContent = satisfactionText; // Exibir "Satisfeito" ou "Insatisfeito"

  // Adiciona um botão de deletar à última célula
  insertButton(row.insertCell(15));

  // Limpa os campos de entrada
  document.getElementById("newPassengerName").value = "";
  document.getElementById("newPassengerAge").value = "";
  document.getElementById("newPassengerGender").value = "";
  document.getElementById("newCustomerType").value = "";
  document.getElementById("newTypeOfTravel").value = "";
  document.getElementById("newFlightDistance").value = "";
  document.getElementById("newClassType").value = "";
  document.getElementById("newSeatComfort").value = "";
  document.getElementById("newInflightEntertainment").value = "";
  document.getElementById("newCheckinService").value = "";
  document.getElementById("newInflightService").value = "";
  document.getElementById("newCleanliness").value = "";
  document.getElementById("newDepartureDelay").value = "";
  document.getElementById("newArrivalDelay").value = "";

  const removeElement = (element) => {
    element.parentNode.removeChild(element);  // Remove o elemento da DOM
  };
}
