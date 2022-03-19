USE [master]
GO
/****** Object:  Database [LibraryDB]    Script Date: 19.03.2022 20:46:13 ******/
CREATE DATABASE [LibraryDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'LibraryDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\LibraryDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'LibraryDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\LibraryDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [LibraryDB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [LibraryDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [LibraryDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [LibraryDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [LibraryDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [LibraryDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [LibraryDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [LibraryDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [LibraryDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [LibraryDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [LibraryDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [LibraryDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [LibraryDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [LibraryDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [LibraryDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [LibraryDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [LibraryDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [LibraryDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [LibraryDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [LibraryDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [LibraryDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [LibraryDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [LibraryDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [LibraryDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [LibraryDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [LibraryDB] SET  MULTI_USER 
GO
ALTER DATABASE [LibraryDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [LibraryDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [LibraryDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [LibraryDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [LibraryDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [LibraryDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [LibraryDB] SET QUERY_STORE = OFF
GO
USE [LibraryDB]
GO
/****** Object:  Table [dbo].[Book]    Script Date: 19.03.2022 20:46:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Book](
	[BookId] [int] IDENTITY(1,1) NOT NULL,
	[Author] [nvarchar](50) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[ReleaseDate] [datetime] NULL,
	[ISBN] [nvarchar](50) NOT NULL,
	[BookGenreId] [int] NOT NULL,
	[Count] [int] NOT NULL,
	[AddDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_Book] PRIMARY KEY CLUSTERED 
(
	[BookId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Borrow]    Script Date: 19.03.2022 20:46:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Borrow](
	[BorrowId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[BookId] [int] NOT NULL,
	[FromDate] [datetime] NOT NULL,
	[ToDate] [datetime] NOT NULL,
	[IsReturned] [bit] NOT NULL,
 CONSTRAINT [PK_Borrow] PRIMARY KEY CLUSTERED 
(
	[BorrowId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DictBookGenre]    Script Date: 19.03.2022 20:46:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DictBookGenre](
	[BookGenreId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_DictBookGenre] PRIMARY KEY CLUSTERED 
(
	[BookGenreId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 19.03.2022 20:46:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[BirthDate] [datetime] NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](50) NULL,
	[AddDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Borrow] ADD  CONSTRAINT [DF_Borrow_IsReturned]  DEFAULT ((0)) FOR [IsReturned]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_IsActive]  DEFAULT ((0)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Book]  WITH CHECK ADD  CONSTRAINT [FK_Book_DictBookGenre] FOREIGN KEY([BookGenreId])
REFERENCES [dbo].[DictBookGenre] ([BookGenreId])
GO
ALTER TABLE [dbo].[Book] CHECK CONSTRAINT [FK_Book_DictBookGenre]
GO
ALTER TABLE [dbo].[Borrow]  WITH CHECK ADD  CONSTRAINT [FK_Borrow_Book] FOREIGN KEY([BookId])
REFERENCES [dbo].[Book] ([BookId])
GO
ALTER TABLE [dbo].[Borrow] CHECK CONSTRAINT [FK_Borrow_Book]
GO
ALTER TABLE [dbo].[Borrow]  WITH CHECK ADD  CONSTRAINT [FK_Borrow_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO
ALTER TABLE [dbo].[Borrow] CHECK CONSTRAINT [FK_Borrow_User]
GO
USE [master]
GO
ALTER DATABASE [LibraryDB] SET  READ_WRITE 
GO
