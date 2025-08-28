import react, { usestate, useeffect } from 'react';
import {
  view,
  text,
  flatlist,
  image,
  touchableopacity,
  styleSheet,
  alert,
  activityindicator,
} from 'react-native';
import asyncstorage from '@react-native-async-storage/async-storage';

export default function listadesejos({ navigation }) {
  const [lista, setlista] = usestate([]);
  const [loading, setloading] = usestate(true);

  // carrega a lista quando o componente é montado
  useeffect(() => {
    carregarlista();
  }, []); // array vazio = executa apenas uma vez

  const carregarlista = async () => {
    setloading(true);
    try {
      // busca os dados no asyncstorage
      const raw = await asyncstorage.getitem('listadesejos');
      // converte de json para objeto javascript
      const parsed = raw ? json.parse(raw) : [];
      // garante que sempre seja um array
      setlista(array.isarray(parsed) ? parsed : []);
    } catch (e) {
      console.error('erro ao carregar lista de desejos', e);
      alert.alert('erro', 'não foi possível carregar a lista de desejos.');
    } finally {
      setloading(false);
    }
  };

  const removeritem = async (id) => {
    try {
      // filtra a lista removendo o item com o id especificado
      const nova = lista.filter(item => item.id !== id);
      // salva a nova lista no storage
      await asyncstorage.setitem('listadesejos', json.stringify(nova));
      // atualiza o estado local
      setlista(nova);
    } catch (e) {
      console.error('erro ao remover item', e);
      alert.alert('erro', 'não foi possível remover o item.');
    }
  };

  const confirmarremover = (id, name) => {
    alert.alert(
      'remover',
      `remover ${name} da lista de desejos?`,
      [
        { text: 'cancelar', style: 'cancel' },
        { 
          text: 'remover', 
          style: 'destructive', 
          onpress: () => removeritem(id) 
        },
      ]
    );
  };

  const renderitem = ({ item }) => (
    <view style={styles.item}>
      {item.image ? (
        <image source={{ uri: item.image }} style={styles.imagem} />
      ) : (
        <view style={[styles.imagem, styles.imagemplaceholder]} />
      )}
      
      <view style={styles.info}>
        <text style={styles.nome} numberoflines={2}>{item.name || 'sem nome'}</text>
        <text style={styles.preco}>{item.preco || ''}</text>
      </view>
      
      <view style={styles.actions}>
        <touchableopacity
          style={styles.botaoremover}
          onpress={() => confirmarremover(item.id, item.name)}
        >
          <text style={styles.textoremover}>remover</text>
        </touchableopacity>
      </view>
    </view>
  );

  if (loading) {
    return (
      <view style={styles.center}>
        <activityindicator size="large" />
      </view>
    );
  }

  return (
    <view style={styles.container}>
      {lista.length === 0 ? (
        <view style={styles.center}>
          <text style={styles.vazio}>sua lista de desejos está vazia.</text>
        </view>
      ) : (
        <flatlist
          data={lista}
          keyextractor={(item, index) => (item.id ? string(item.id) : string(index))}
          renderitem={renderitem}
          contentcontainerstyle={styles.list}
        />
      )}
    </view>
  );
}

const styles = stylesheet.create({
  container: { flex: 1, backgroundcolor: '#f8f9fa' },
  center: { flex: 1, justifycontent: 'center', alignitems: 'center' },
  vazio: { fontsize: 16, color: '#666' },
  list: { padding: 12 },
  item: {
    flexdirection: 'row',
    backgroundcolor: '#fff',
    borderradius: 10,
    padding: 10,
    marginbottom: 10,
    alignitems: 'center',
    elevation: 2,
  },
  imagem: { width: 70, height: 70, borderradius: 8, backgroundcolor: '#eee' },
  imagemplaceholder: { justifycontent: 'center', alignitems: 'center' },
  info: { flex: 1, marginleft: 12 },
  nome: { fontsize: 16, fontweight: '600', marginbottom: 4 },
  preco: { fontsize: 14, color: '#28a745' },
  actions: { marginleft: 8 },
  botaoremover: { 
    paddingvertical: 6, 
    paddinghorizontal: 10, 
    backgroundcolor: '#ff6b6b',
    borderradius: 8 
  },
  textoremover: { color: '#fff', fontweight: '600' },
});