package br.com.unionti.restclientapp.rest.mapping;

import java.io.Serializable;

public class Password implements Serializable {

	private static final long serialVersionUID = 6200075054415035263L;
	
	private String currentpassword;
	private String newpassword;
	
	public String getCurrentpassword() {
		return currentpassword;
	}
	public void setCurrentpassword(String currentpassword) {
		this.currentpassword = currentpassword;
	}
	public String getNewpassword() {
		return newpassword;
	}
	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((currentpassword == null) ? 0 : currentpassword.hashCode());
		result = prime * result + ((newpassword == null) ? 0 : newpassword.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Password other = (Password) obj;
		if (currentpassword == null) {
			if (other.currentpassword != null)
				return false;
		} else if (!currentpassword.equals(other.currentpassword))
			return false;
		if (newpassword == null) {
			if (other.newpassword != null)
				return false;
		} else if (!newpassword.equals(other.newpassword))
			return false;
		return true;
	}
	
}
