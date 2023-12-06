package org.libertas.bd;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexao {

    private Connection connection;

	public Conexao() {
		try {
			String bancoDados = "carros";
			   Class.forName("org.mariadb.jdbc.Driver");

			String url = "jdbc:mariadb://localhost:3306/"+bancoDados;
			String usuario= "root";
			String senha = "Q1w2e3r4#";
			try {
				connection= DriverManager.getConnection(url, usuario, senha);
				System.out.println("Conexão realizada");
			} catch (SQLException e) {
				System.out.println(e.getMessage());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			
		}
	
		
	}
	
	public void desconectar(){
		try {
			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Connection getConexao() {
		return connection;
	}

	public void setConnection(Connection connection) {
		this.connection = connection;
	}
}