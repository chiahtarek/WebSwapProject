const {useEffect, useState} = React;

function App() {
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        fetch('http://localhost:3001/api/mensagem')
            .then(resposta => resposta.json())
            .then(dados => setMensagem(dados.texto))
            .catch(erro => console.error('Erro ao buscar mensagem do servidor:', erro));
    }, []);

    return (
        <div>
            <h1>Mensagem do Servidor:</h1>
            <p>{mensagem}</p> 
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);