package ua.model;

public class OStype {
	private int windows;
	private int linux;
	private int mac;
	private int other;

	public int getOther() {
		return other;
	}

	public void setOther(int other) {
		this.other = other;
	}

	public int getWindows() {
		return windows;
	}

	public void setWindows(int windows) {
		this.windows = windows;
	}

	public int getLinux() {
		return linux;
	}

	public void setLinux(int linux) {
		this.linux = linux;
	}

	public int getMac() {
		return mac;
	}

	public void setMac(int mac) {
		this.mac = mac;
	}

}
