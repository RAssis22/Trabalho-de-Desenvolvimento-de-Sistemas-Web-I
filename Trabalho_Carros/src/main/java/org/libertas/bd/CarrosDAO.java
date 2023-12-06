package org.libertas.bd;

import java.sql.Statement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;


public class CarrosDAO {
	public void inserir(Carros c) {
		Conexao con = new Conexao();
		try {
			String sql = "INSERT INTO carros"
					+ " (modelo, marca, ano, placa, cor ) VALUES (?, ?, ?, ?, ?) ";
			PreparedStatement prep = con.getConexao().prepareStatement(sql);
			prep.setString(1, c.getModelo());
			prep.setString(2, c.getMarca());
			prep.setString(3, c.getAno());
			prep.setString(4, c.getPlaca());
			prep.setString(5, c.getCor());
			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
	}
	public void alterar(Carros c) {
		Conexao con = new Conexao();
		try {
			String sql = "UPDATE carros"
					+ " SET modelo = ?, marca = ?, ano = ?, placa = ?, cor = ?  "
					+ " WHERE id = ? ";
			PreparedStatement prep = con.getConexao().prepareStatement(sql);
			prep.setString(1, c.getModelo());
			prep.setString(2, c.getMarca());
			prep.setString(3, c.getAno());
			prep.setString(4, c.getPlaca());
			prep.setString(5, c.getCor());
			prep.setInt(6, c.getId());
			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
		
	}
	
	public void excluir(Carros c) {
		Conexao con = new Conexao();
		try {
			String sql = " DELETE FROM carros "
					+ " WHERE id = ? ";
			PreparedStatement prep = con.getConexao().prepareStatement(sql);
			prep.setInt(1, c.getId());
			
			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
		
	}

	public Carros consultar(int id) {

		Carros c = new Carros();
		Conexao con = new Conexao();
		try {
			String sql = "SELECT * FROM carros WHERE id = " + id;
			Statement sta = con.getConexao().createStatement();
			ResultSet res = sta.executeQuery(sql);
			while (res.next()) {
				c.setId(res.getInt("id"));
				c.setModelo(res.getString("modelo"));
				c.setMarca(res.getString("marca"));
				c.setAno(res.getString("ano"));
				c.setPlaca(res.getString("placa"));
				c.setCor(res.getString("cor"));
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
		return c;
	}
		
	public List<Carros> listar(){
		List<Carros> lista = new LinkedList<Carros>();
			Conexao con = new Conexao();
		
		try {
			String sql = "SELECT * FROM carros ORDER BY id";
			Statement sta = con.getConexao().createStatement();
			ResultSet res = sta.executeQuery(sql);
			while (res.next()) {
				Carros c = new Carros();
				c.setId(res.getInt("id"));
				c.setModelo(res.getString("modelo"));
				c.setMarca(res.getString("marca"));
				c.setAno(res.getString("ano"));
				c.setPlaca(res.getString("placa"));
				c.setCor(res.getString("cor"));
				
				
				lista.add(c);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
		return lista;
	}
}

